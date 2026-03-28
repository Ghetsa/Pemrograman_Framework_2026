import Link from "next/link";
import style from "../../auth/register/register.module.scss";

const TampilanRegister = () => {
  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>
      
      <div className={style.register__form}>
        <form action="">
          {/* Email Item */}
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
            />
          </div>

          {/* Fullname Item */}
          <div className={style.register__form__item}>
            <label htmlFor="Fullname" className={style.register__form__item__label}>
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
            />
          </div>

          {/* Password Item */}
          <div className={style.register__form__item}>
            <label htmlFor="Password" className={style.register__form__item__label}>
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className={style.register__form__item__input}
            />
          </div>

          {/* Perhatikan: Class Button disesuaikan dengan SCSS yang diperbaiki */}
          <button type="submit" className={style.register__form__button}>
            Register
          </button>
        </form>

        <p className={style.register__form__text}>
          Sudah punya akun? 
          <Link href="/auth/login"> Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;