import Link from "next/link"
import { useRouter } from "next/router"
// import styles from "./login.module.css"
import styles from "./login.module.scss"
import { signIn } from "next-auth/react"

const halamanLogin = () => {
    const { push } = useRouter();
    const handlerLogin = () => {
        localStorage.setItem("isLogin", "true")
        push("/produk")
    }
    return (
        <div className={styles.login}>
            <h1 className="text-3xl font-bold text-blue-600 ">Halaman Login</h1>
            <button onClick={() => handlerLogin()}>Login</button> <br />
            <h1 style={{ color: "red", border: "1px solid red", borderRadius: "5px", padding: "5px", }}>Belum Punya Akun</h1> <br />
            {/* <Link href="/auth/register">Ke Halaman Register</Link> */}
            <a onClick={() => signIn()} style={{ cursor: "pointer", color: "black" }}>
                Register
            </a>
        </div>
    )
}

export default halamanLogin