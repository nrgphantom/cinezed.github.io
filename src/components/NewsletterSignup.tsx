
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
    <div className="w-full max-w-md">
      <h3 className="text-sm font-semibold mb-2 text-white">Subscribe to Our Newsletter</h3>
      <p className="text-xs text-gray-400 mb-4">
        Get the latest film recommendations and updates delivered to your inbox
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    placeholder="Your email address" 
                    {...field} 
                    className="bg-cinezed-darker border-white/10" 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            <Mail className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewsletterSignup;
