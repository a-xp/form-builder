export interface FormDescription {
  id: number;
  title: string;
  description?: string;
  button: string;
  fields: InputField[]
}

export enum InputType {
  line = "line",
  text = "text",
  radio = "radio",
  checkbox = "checkbox",
  select = "select",
  file = "file"
}

export interface InputField {
  title: string;
  type: InputType;
  required: boolean;
  options?: string[];
}


