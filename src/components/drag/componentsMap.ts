import {Badge, BadgeProps, Button, ButtonProps, Table, TableProps} from "@/components/ui";

export const componentsMap: {
    Table: React.FunctionComponent<TableProps>;
    Button: ({
                 children,
                 size,
                 variant,
                 startIcon,
                 endIcon,
                 onClick,
                 className,
                 disabled
             }: ButtonProps) => React.JSX.Element;
    Badge: ({variant, color, size, startIcon, endIcon, children}: BadgeProps) => React.JSX.Element
} = {
    Button,
    Badge,
    Table,
};
