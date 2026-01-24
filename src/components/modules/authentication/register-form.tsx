"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FieldGroup, FieldLabel, Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { authClient } from "@/lib/auth-client" // Tomar auth client path
import { toast } from "sonner" // Optional: alert er jonno

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: formSchema, // Real-time validation er jonno
    },
    onSubmit: async ({ value }) => {
      // Better Auth SignUp logic
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
        callbackURL: "/dashboard", // Sign up er por kothay jabe
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
      } else {
        toast.success("Account created successfully!");
      }
    },
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="registerForm"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <FieldGroup className="space-y-4">
            {/* Name Field */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)} // Corrected spelling
                      placeholder="John Doe"
                    />
                    {isInvalid && <FieldError className="text-red-500 text-sm">{field.state.meta.errors}</FieldError>}
                  </Field>
                )
              }}
            />

            {/* Email Field */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="m@example.com"
                    />
                    {isInvalid && <FieldError className="text-red-500 text-sm">{field.state.meta.errors}</FieldError>}
                  </Field>
                )
              }}
            />

            {/* Password Field */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && <FieldError className="text-red-500 text-sm">{field.state.meta.errors}</FieldError>}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        {/* Submit button logic */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button form="registerForm" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Creating..." : "Register"}
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  )
}