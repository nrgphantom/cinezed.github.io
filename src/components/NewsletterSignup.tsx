
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const NewsletterSignup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would connect to your backend
      console.log("Newsletter signup:", data.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("You've successfully subscribed to our newsletter!");
      form.reset();
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Newsletter signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    placeholder="Subscribe to newsletter" 
                    {...field} 
                    className="bg-cinezed-darker border-white/10 h-9" 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs absolute mt-1" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="sm" className="px-3">
            <Mail className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Subscribe</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewsletterSignup;
