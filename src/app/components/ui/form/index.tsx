import {
    type ReactElement,
    type FormEvent,
    type FormHTMLAttributes,
  } from "react"
  
  interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactElement
    handlerSubmit: (eventData: any) => void
  }
  
  export const Form = ({
    children,
    handlerSubmit,
    className,
    ...props
  }: FormProps) => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = Object.fromEntries(new FormData(event.currentTarget))
      return data
    }
  
    return (
      <form
        onSubmit={(event) => {
          handlerSubmit(onSubmit(event))
        }}
        className={className}
        {...props}
      >
        {children}
      </form>
    )
  }