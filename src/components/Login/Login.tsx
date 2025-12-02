import React from "react";
import Header from "@/components/Header";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginInputs, styles } from "@/components/AuthForms";
import Logo from "@/assets/images/logo.svg";
import { Input, Button } from "@/common";
import { getTsyringeUserService } from "@/di/tsyringe";
import { useAppDispatch } from "@/store/hooks.ts";
import { login as loginAction } from "@/store/user/slice.ts";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const userService = getTsyringeUserService();
    const user = await userService.login({ username: data.nickname, password: data.password });
    dispatch(loginAction({ username: user.username, email: user.email, password: user.password }));
    if (!data.keepLoggedIn) reset();
    navigate("/");
  };

  return (
    <>
      <Header />
      <section className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.logo_container} aria-label="CapyCode">
            <img src={Logo} alt="" className={styles.logo_image} />
            CapyCode
          </div>

          <Input
            className={styles.input}
            type="text"
            placeholder="Nickname"
            autoComplete="username"
            {...register("nickname")}
          />
          <Input
            className={styles.input}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password")}
          />

          <div className={styles.checkbox_container}>
            <Input
              className={styles.checkbox}
              type="checkbox"
              label="Keep me logged in"
              {...register("keepLoggedIn")}
            />
          </div>

          <Button type="submit" text="Sign in" className={styles.submit} />

          <div className={styles.bottom_container}>
            <p>
              <span>Don’t have an account?</span>
              <Link to="/register">Sign Up</Link>
            </p>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
