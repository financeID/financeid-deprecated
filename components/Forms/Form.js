import React from 'react';
import { Formik } from 'formik';

export default function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      {() => <React.Fragment>{children}</React.Fragment>}
    </Formik>
  );
}
