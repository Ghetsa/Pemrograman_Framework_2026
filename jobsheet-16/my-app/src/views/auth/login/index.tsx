import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Tampilanlogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { push, query } = useRouter();

    const callbackUrl: any = query.callbackUrl || "/";
    const [error, setError] = useState("");
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        //const form = event.currentTarget;
        // const formData = new FormData(event.currentTarget);
        // const email = formData.get("email") as string;
        // const fullname = formData.get("Fullname") as string;
        // const password = formData.get("Password") as string;

        // const response = await fetch("/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email, fullname, password }),
        // });
        // // const result = await response.json();
        // // console.log(result);
        // if (response.status === 200) {
        //   form.reset();
        //   // event.currentTarget.reset();
        //   setIsLoading(false);
        //   push("/auth/login");
        // } else {
        //   setIsLoading(false);
        //   setError(
        //     response.status === 400 ? "Email already exists" : "An error occurred",
        //   );
        // }
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            // console.log("signIn response:", res);
            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setError("Login failed");
            }
        } catch (error) {
            setIsLoading(false);
            setError("wrong email or password");
        }
    };

    return (
        <>
        <div className={style.login}>
            <h1 className={style.login__title}>Halaman Login</h1>
            <div className={style.login__form}>
                <form onSubmit={handleSubmit}>

                    {/* INPUT EMAIL */}
                    <div className={style.login__form__item}>
                        <label htmlFor="email" className={style.login__form__item__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className={style.login__form__item__input}
                            style={error.includes("Email") ? { borderColor: 'red' } : {}}
                        />
                        {/* Error khusus Email */}
                        {error.includes("Email") && (
                            <span className={style.login__form__item__error_message}>
                                {error}
                            </span>
                        )}
                    </div>

                    {/* INPUT PASSWORD */}
                    <div className={style.login__form__item}>
                        <label htmlFor="Password" className={style.login__form__item__label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className={style.login__form__item__input}
                            style={error.includes("password") ? { borderColor: 'red' } : {}}
                            required
                        />
                        {/* Error khusus Password */}
                        {error.includes("password") && (
                            <span className={style.login__form__item__error_message}>
                                {error}
                            </span>
                        )}

                        <button
                            type="submit"
                            className={style.login__form__item__button}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                    </div>

                    <p className={style.login__form__text}>
                        Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
                    </p>
                </form>
            </div>
        </div>
        </>
    );
};

export default Tampilanlogin;