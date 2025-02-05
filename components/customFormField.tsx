/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control } from "react-hook-form";
import { ReactNode } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "@/types/formField.types";
import { Select, SelectValue, SelectContent, SelectTrigger } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomPropsField {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: ReactNode;
  renderSkeleton?: (field: any) => ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomPropsField;
}) => {
  const {
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="pl-1 flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            placeholder={placeholder}
            defaultCountry="ID"
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={"/assets/icons/calendar.svg"}
            alt="calendar"
            height={24}
            width={24}
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "dd/MM/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-x-4">
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="text-green-500"
          />
          <label htmlFor={name} className="checkbox-label">
            {label}
          </label>
        </div>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      break;
  }
};

const CustomFormField = (props: CustomPropsField) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && fieldType !== FormFieldType.CHECKBOX && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
