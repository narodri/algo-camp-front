import React, { useState, useEffect, useRef } from 'react';

export default function Wide(props: any) {
    const [height, setHeight] = useState("auto");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        setHeight(textareaRef.current.scrollHeight + "px");
        }
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
            textareaRef.current.style.height=height;
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            setHeight(textareaRef.current.scrollHeight + "px");
        }
    }, []);

    return (
        <div className="mx-auto mb-0 mt-8 space-y-4">
        <label htmlFor="input-letter" className="text-m grid font-medium leading-6 text-gray-900">
            {props.title}
        </label>
        <textarea
            id="input-letter"
            ref={textareaRef}
            defaultValue={props.value}
            style={{ height: height, transition: 'height 0.2s' }}
            onInput={handleChange}
            onBlur={handleChange2}
            className="block rounded-md w-full h-auto py-4 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name={props.name}
        />
        </div>
    );
}

