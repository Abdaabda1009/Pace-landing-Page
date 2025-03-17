import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Loader2, ArrowLeft, User, Mail, Building, Heart } from "lucide-react";
import { supabase } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  reason: z.string().optional(),
});

interface SignUpFormValues {
  name: string;
  email: string;
  company?: string;
  reason?: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  // Form initialization with default values
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      reason: "",
    },
  });

  // Mutation for handling form submission
 const { mutateAsync: signUpForBeta, isPending } = useMutation<
   unknown,
   Error,
   SignUpFormValues
 >({
   mutationFn: async (formData) => {
     // Check for existing email
     const { data: existing, error: lookupError } = await supabase
       .from("beta_signups")
       .select("email")
       .eq("email", formData.email)
       .maybeSingle(); // Use maybeSingle here

     if (lookupError) {
       console.error("Lookup error:", lookupError);
       throw new Error("Error checking existing registrations");
     }

     if (existing) {
       throw new Error("This email is already registered");
     }

     // Insert new record
     const { data, error } = await supabase
       .from("beta_signups")
       .insert([
         {
           ...formData,
           created_at: new Date().toISOString(),
         },
       ])
       .select();

     if (error) {
       console.error("Insert error:", error);
       throw new Error(error.message);
     }

     return data;
   },
 });

  // Form submit handler
  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signUpForBeta(data);
      toast({
        title: "🎉 Success!",
        description: "You're now on the beta access list!",
        variant: "default",
      });
      form.reset(); // Clear form fields
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="min-h-screen bg-[hsl(222.2,84%,4.9%)] flex items-center justify-center px-4 py-12 relative">
      {/* Back Navigation Button */}
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-white/90 hover:text-white flex items-center gap-2 hover:bg-blue-200/10 transition-colors duration-200 group"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Return to Home
      </Button>

      {/* Main Form Container */}
      <div className="w-full max-w-md space-y-8 bg-[#1A1F2C]/70 p-8 rounded-2xl backdrop-blur-lg border border-white/5 shadow-2xl shadow-blue-900/20">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
            Join PACE Early Access
          </h1>
          <p className="text-gray-400/90 text-sm">
            Be among the first to experience our innovative platform
          </p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 [&_input]:placeholder-gray-500"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-[#12141D] border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 text-white/90 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                      className="bg-[#12141D] border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 text-white/90 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            {/* Company Field */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Company (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Corp"
                      {...field}
                      className="bg-[#12141D] border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 text-white/90 transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            {/* Reason Field */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Why are you interested? (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your motivation with us..."
                      {...field}
                      className="bg-[#12141D] border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 text-white/90 resize-y min-h-[100px] transition-colors"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <SpotlightCard
              className="w-full h-[52px] border-0 p-1 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/40 hover:to-indigo-600/40 transition-all duration-300 hover:scale-[1.02] group"
              spotlightColor="rgba(65, 126, 223, 0.4)"
            >
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-full w-full bg-transparent border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/5 flex items-center gap-2 text-white/90 hover:text-white transition-all"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <LoadingSpinner size={20} color="text-white/90" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </Button>
            </SpotlightCard>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
