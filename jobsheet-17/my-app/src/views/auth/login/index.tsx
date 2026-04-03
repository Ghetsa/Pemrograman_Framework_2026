import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";


const Tampilanlogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { push, query } = useRouter();

    const callbackUrl: any = query.callbackUrl || "/";

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            if (res?.error) {
                if (res.error === "CredentialsSignin") {
                    setError("Email atau password salah");
                } else {
                    setError("Terjadi kesalahan saat login");
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
                push(callbackUrl);
            }
        } catch (err) {
            setIsLoading(false);
            setError("Terjadi kesalahan, coba lagi");
        }
    };

    return (
        <div className={style.login}>
            <h1 className={style.login__title}>Halaman Login</h1>

            <div className={style.login__form}>
                <form onSubmit={handleSubmit}>


                    {/* EMAIL */}
                    <div className={style.login__form__item}>
                        <label className={style.login__form__item__label}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={style.login__form__item__input}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className={style.login__form__item}>
                        <label className={style.login__form__item__label}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={style.login__form__item__input}
                            required
                        />
                    </div>

                    {/* ERROR GLOBAL */}
                    {error && (
                        <span className={style.login__form__item__error_message}>
                            {error}
                        </span>
                    )}

                    {/* BUTTON LOGIN UTAMA */}
                    <button
                        type="submit"
                        className={style.login__form__button}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>

                    <div className={style.login__form__divider}>
                        <span>atau</span>
                    </div>

                    {/* BUTTON GOOGLE DENGAN CLASS KHUSUS */}
                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl, redirect: false })}
                        className={`${style.login__form__button} ${style.login__form__button__google}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <>
                                <img
                                    src="https://authjs.dev/img/providers/google.svg"
                                    alt="Google Icon"
                                    width="18"
                                    height="18"
                                />
                                <span>Sign In with Google</span>
                            </>
                        )}
                    </button>
                    {/* LINK */}
                    <p className={style.login__form__text}>
                        Belum punya akun?{" "}
                        <Link href="/auth/register">Ke Halaman Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Tampilanlogin;