import React from "react";
import Header from "@/components/Header";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type RegistrationInputs, styles } from "@/components/AuthForms";
import Logo from "@/assets/images/logo.svg";
import { Input, Button } from "@/common";
import { getTypeDiUserService } from "@/di/typedi";
import { useAppDispatch } from "@/store/hooks.ts";
import { setUser } from "@/store/user/slice.ts";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegistrationInputs>();
  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const userService = getTypeDiUserService();
    const user = await userService.register({
      username: data.nickname,
      email: data.email,
      password: data.password,
    });
    dispatch(setUser(user));
    navigate("/");
  };

  return (
    <>
      <Header />
      <section className={styles.main}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.form} ${styles.register}`}
          noValidate
        >
          <div className={styles.logo_container} aria-label="CapyCode">
            <img src={Logo} alt="" className={styles.logo_image} />
            CapyCode
          </div>

          <Input
            className={styles.input}
            type="text"
            placeholder="Nickname"
            autoComplete="username"
            {...register("nickname", { required: true })}
          />
          <Input
            className={styles.input}
            type="date"
            placeholder="Birthday date MM/DD/YYYY"
            {...register("birthdate")}
          />
          <Input
            className={styles.input}
            type="email"
            placeholder="E-mail address"
            autoComplete="email"
            {...register("email", { required: true })}
          />
          <Input
            className={styles.input}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
          <Input
            className={styles.input}
            type="password"
            placeholder="Repeat password"
            autoComplete="new-password"
            {...register("confirmPassword", { required: true })}
          />

          <Button type="submit" text="Sign up" className={styles.submit} />

          <div className={styles.bottom_container}>
            <p>
              <span>Already have an account?</span>
              <a href="/login">Sign In</a>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Registration;
