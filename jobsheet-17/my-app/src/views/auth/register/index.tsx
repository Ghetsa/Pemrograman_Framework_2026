import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        
        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const fullname = formData.get("fullname") as string;
        const password = formData.get("password") as string;

        // Validasi Client-side
        if (!email) {
            setError("Email wajib diisi");
            return;
        }

        if (password.length < 6) {
            setError("password minimal harus 6 karakter");
            return;
        }

        setIsLoading(true);

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                fullname,
                password,
                createdAt: new Date()
            }),
        });

        if (response.status === 200) {
            form.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            const result = await response.json();
            setError(result.message || "An error occurred");
        }
    };

    return (
        <div className={style.register}>
            <h1 className={style.register__title}>Halaman Register</h1>
            <div className={style.register__form}>
                <form onSubmit={handleSubmit}>
                    
                    {/* INPUT EMAIL */}
                    <div className={style.register__form__item}>
                        <label htmlFor="email" className={style.register__form__item__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={style.register__form__item__input}
                            style={error.toLowerCase().includes("email") ? { borderColor: 'red' } : {}}
                            required
                        />
                        {/* Error khusus Email */}
                        {error.toLowerCase().includes("email") && (
                            <span className={style.register__form__item__error_message}>
                                {error}
                            </span>
                        )}
                    </div>

                    {/* INPUT fULLNAME */}
                    <div className={style.register__form__item}>
                        <label htmlFor="fullname" className={style.register__form__item__label}>
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="fullname"
                            className={style.register__form__item__input}
                            required
                        />
                    </div>

                    {/* INPUT PASSWORD */}
                    <div className={style.register__form__item}>
                        <label htmlFor="password" className={style.register__form__item__label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className={style.register__form__item__input}
                            style={error.toLowerCase().includes("password") ? { borderColor: 'red' } : {}}
                            required
                        />
                        {/* Error khusus password */}
                        {error.toLowerCase().includes("password") && (
                            <span className={style.register__form__item__error_message}>
                                {error}
                            </span>
                        )}

                        <button
                            type="submit"
                            className={style.register__form__button}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Register"}
                        </button>
                    </div>

                    <p className={style.register__form__text}>
                        Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default TampilanRegister;