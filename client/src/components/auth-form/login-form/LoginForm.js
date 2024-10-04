import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import EmailStep from "../form-steps/EmailStep";
import PasswordStep from "../form-steps/PasswordStep";

const LoginForm = ({ onSubmit, onReturn }) => {
  const [step, setStep] = useState(1);

  // Proceed to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          onSubmit();
        }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string()
            .required()
            .test(
              "length",
              "",
              (val) => !val || (val && val.toString().length >= 8)
            ),
        })}
      >
        {({ values, errors }) => (
          <Form>
            {step === 1 && (
              <EmailStep
                nextStep={nextStep}
                prevStep={onReturn}
                errors={errors.email}
                nextStepDisabled={
                  values.email === "" || errors.email !== undefined
                }
              />
            )}
            {step === 2 && (
              <PasswordStep
                prevStep={prevStep}
                submitVisable={true}
                submitDisabled={
                  values.password === "" || errors.password !== undefined
                }
                errors={errors.password}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
