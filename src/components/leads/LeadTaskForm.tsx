
import React from "react";
import { useAppContext } from "../../context/AppContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  description: z.string().min(1, "Task description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  responsibleId: z.string().min(1, "Responsible person is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadTaskFormProps {
  leadId: string;
  onClose: () => void;
}

const LeadTaskForm: React.FC<LeadTaskFormProps> = ({ leadId, onClose }) => {
  const { users, addTask } = useAppContext();
  const today = new Date().toISOString().split("T")[0];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      dueDate: today,
      responsibleId: users[0]?.id || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    addTask(leadId, {
      description: data.description,
      dueDate: data.dueDate,
      responsibleId: data.responsibleId,
      done: false,
    });
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="responsibleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsible</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign team member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Task</Button>
        </div>
      </form>
    </Form>
  );
};

export default LeadTaskForm;
