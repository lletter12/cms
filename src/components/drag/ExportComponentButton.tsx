import {Button} from "@/components/ui";

interface ExportComponentButtonProps {
    items: any
}

export const ExportComponentButton = ({items}: ExportComponentButtonProps) => {

    const generateHTML = (items: any[]) => {
        return `
        <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Generated Template</title>
            </head>
            <body>
                ${items.map((item) => item.type === "Button"
                ? `<button onclick="alert('${item.data.text}')">${item.data.text}</button>`
                : `<input placeholder="${item.data.placeholder}" />`).join("\n")}
            </body>
            </html>
        `
    };

    const generateReactCode = (items: any[]) => {
        return `
            import React from "react";
        
            const GeneratedTemplate = () => {
                return (
                    <div>
                        ${items.map((item) => item.type === "Button"
                    ? `<button onClick={() => alert("${item.data.text}")}>${item.data.text}</button>`
                    : `<input placeholder="${item.data.placeholder}" />`).join("\n")}
                    </div>
                );
            };

            export default GeneratedTemplate;
        `;
    };

    const generateVueCode = (items: any[]) => {
        return `
            <template>
                  <div>
                    ${items.map((item) => item.type === "Button"
                    ? `<button @click="handleClick">${item.data.text}</button>`
                    : `<input :placeholder="'${item.data.placeholder}'" />`).join("\n")}
                  </div>
            </template>
            
            <script>
                export default {
                    methods: {
                        handleClick() {
                        alert("버튼 클릭!");
                    }
                  }
                }
            </script>
        `;
    };

    const downloadFile = (filename, content) => {
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <div className={"flex w-full items-center justify-center gap-3.5 pt-7.5"}>
            <Button variant={"outline"} onClick={() => downloadFile("template.html", generateHTML(items))}>
                HTML 변환
            </Button>
            <Button variant={"outline"} onClick={() => downloadFile("template.jsx", generateReactCode(items))}>
                React 변환
            </Button>
            <Button variant={"outline"} onClick={() => downloadFile("template.vue", generateVueCode(items))}>
                Vue 변환
            </Button>
        </div>
    );

}