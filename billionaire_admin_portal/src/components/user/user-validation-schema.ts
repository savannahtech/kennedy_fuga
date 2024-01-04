import * as z from "zod";

const permissionSchema = z.object({
  label: z.string().nonempty(),
  value: z.string().nonempty(),
});

export const customerValidationSchema = z.object({
  first_name: z.string().nonempty("form:error-firstname-required"),
  last_name: z.string().nonempty("form:error-lastname-required"),
  other_names: z.string().nullable().optional(),
  email: z
    .string()
    .email("form:error-email-format")
    .nonempty("form:error-email-required"),
  password: z.string().nonempty("form:error-password-required"),
  permission: z.union([z.array(permissionSchema), permissionSchema]),
});
