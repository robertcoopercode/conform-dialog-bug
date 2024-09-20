import type { MetaFunction } from "@remix-run/node";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTrigger } from "~/Dialog";
import { z } from "zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const zodSchema = z.object({
  name: z.string().min(1),
  syntax: z.string().min(1),
});

export default function Index() {
  const [form, fields] = useForm({
    // Can't just use variableId since there are other HTML elements on the page that might use it as an id
    constraint: getZodConstraint(zodSchema),
    defaultValue: {
      name: "",
      syntax: "",
    },
    shouldValidate: "onBlur",
    onValidate: ({ formData }) => {
      const zodResult = parseWithZod(formData, {
        schema: zodSchema,
      });

      return zodResult;
    },
    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log("Submitting");
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <Dialog>
          <DialogTrigger className={"border p-3"}>Open form</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <form {...getFormProps(form)} className={"flex flex-col gap-y-4"}>
                <p>
                  Tab focus through the inputs and notice how when the onBlur
                  validation gets triggered, the focus goes to the dialog.
                </p>
                <input
                  className="border"
                  {...getInputProps(fields.name, { type: "text" })}
                />
                <input
                  className="border"
                  {...getInputProps(fields.syntax, { type: "text" })}
                />
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
