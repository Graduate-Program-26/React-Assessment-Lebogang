"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import {useDebounce} from "use-debounce"
import { useState, useEffect } from 'react'
export default function SearchBar(values: {value: string, onChange: (value: string) => void, placeholder?: string}) {
    const [query] = useDebounce(values.value, 500);
    const [text, setText] = useState(values.value)

    useEffect(() => {
       // This prevents searching for empty strings on mount
        if (query !== undefined) {
            values.onChange(query);
        }
    }, [query, values.onChange]);


    return (
        <div className="w-full max-w-md mx-auto">
            <Field orientation="horizontal">
                <Input type="search" placeholder={values.placeholder} value={values.value} onChange={(e) => {values.onChange(e.target.value); setText(e.target.value)}} />
                <Button onClick={() => values.onChange(text)}>Search</Button>
            </Field>
        </div>
    )
}
