import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/formError";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    watch,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Listener,
    },
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <div className="w-full h-screen flex flex-col bg-blue-100">
      <Helmet>
        <title>Create Account | Podcast</title>
      </Helmet>
      <div className="w-full md:max-w-sm flex-col px-4 lg:p-10 items-center mt-10 lg:mt-28 mx-auto lg:border border-blue-400 rounded-lg">
        <h4 className="w-full text-center mb-5 text-blue-900 text-2xl">
          PODCAST
        </h4>
        <h4 className="w-full text-center mb-5 text-blue-900 text-xl">
          Create your account
        </h4>
        <hr className="border border-blue-200"></hr>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input rounded-3xl"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input rounded-3xl"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <div className="flex text-center text-blue-900">
            <input
              ref={register({ required: true })}
              type="radio"
              className="hidden"
              id="listener"
              name="role"
              required
              value={UserRole.Listener}
            />
            <label
              className={`cursor-pointer bg-white rounded-l-3xl w-1/2 py-3 hover:underline ${
                watch("role") === UserRole.Listener
                  ? "text-white bg-blue-600"
                  : ""
              }`}
              htmlFor="listener"
            >
              Listener
            </label>
            <input
              ref={register({ required: true })}
              type="radio"
              className="hidden"
              id="host"
              name="role"
              required
              value={UserRole.Host}
            />
            <label
              className={`cursor-pointer bg-white rounded-r-3xl w-1/2 py-3 hover:underline ${
                watch("role") === UserRole.Host ? "text-white bg-blue-600" : ""
              }`}
              htmlFor="host"
            >
              Host
            </label>
          </div>
          <Button loading={loading} actionText={"Create Account"} />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/" className="text-blue-900 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
