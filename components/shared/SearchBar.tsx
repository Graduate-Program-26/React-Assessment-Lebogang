"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'

export default function SearchBar(values: {value: string, onChange: (value: string) => void, placeholder?: string}) {
    function handleSearch() {
        // send to api route that will search for repositories, users, or issues based on the query
        // maybe also go to the explore page with the search query as a parameter and show the results there
        
    }
    return (
        <div className="w-full max-w-md mx-auto">
            <Field orientation="horizontal">
                <Input type="search" placeholder={values.placeholder} value={values.value} onChange={(e) => values.onChange(e.target.value)} />
                <Button>Search</Button>
            </Field>
        </div>
    )
}
