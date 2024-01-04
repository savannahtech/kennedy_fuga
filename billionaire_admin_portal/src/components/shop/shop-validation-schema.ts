import * as yup from "yup";
export const shopValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
  balance: yup.object().shape({
    payment_info: yup.object().shape({
      email: yup
        .string()
        .typeError("form: error-email-string")
        .email("form:error-email-format"),
      account: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)),
    }),
  }),
});


// import * as z from "zod";

// export const shopValidationSchema = z.object({
//   name: z.string().nonempty("form:error-name-required"),
//   slug: z.string().nonempty('slug name is required'),
//   balance: z.object({
//     payment_info: z.object({
//       email: z.string().email("form:error-email-format"),
//         // email: z.string().refine(value => value === '' || z.string().email().parse(value) === value, {
//         //   message: 'form:error-email-format',
//         // }),
//       // account: z
//       //   .number()
//       //   .transform((value) => (isNaN(value) ? undefined : value)).optional(),
//     }),
//   }),
// });
