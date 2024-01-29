import React from 'react'
import { cn } from '@lib/utils'
export function Label({ htmlFor, children, className = '' }: { htmlFor?: string, children?: React.ReactNode | React.ReactNode[], className?: string }) {
    return (
        <label htmlFor={htmlFor} className={cn(className, 'flex flex-col gap-1')}>
            {children}
        </label>
    )
}