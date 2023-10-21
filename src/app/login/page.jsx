"use client";
import React, { use, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı zorunludur.'),
    password: Yup.string().required('Şifre zorunludur.'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await login(values);
      if (res.status === 200) {
        router.push('/admin');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="w-full h-screen absolute inset-0 flex bg-white z-[999] justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Giriş Yap</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="mt-8 space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Kullanıcı Adı
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 rounded-md border border-gray-300 w-full"
                />
                <ErrorMessage name="username" component="p" className="mt-2 text-sm text-red-600" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 rounded-md border border-gray-300 w-full"
                />
                <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#212121] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Giriş Yap
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
