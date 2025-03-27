import React from "react";
import {ElementProps} from "@/components/types/tree";
import {ExtendedUserProps, mergeProps} from "@/utils/mergeProps";

export interface UseInteractionsReturn {
    getReferenceProps: (
        userProps?: React.HTMLProps<Element>,
    ) => Record<string, unknown>;
    getFloatingProps: (
        userProps?: React.HTMLProps<HTMLElement>,
    ) => Record<string, unknown>;
    getItemProps: (
        userProps?: Omit<React.HTMLProps<HTMLElement>, 'selected' | 'active'> &
            ExtendedUserProps,
    ) => Record<string, unknown>;
}

export function useInteractions(
    propsList: Array<ElementProps | void> = [],
): UseInteractionsReturn {
    const referenceDeps = propsList.map((key) =>  {if(key) return key.reference});
    const floatingDeps = propsList.map((key) => {if(key) key.floating});
    const itemDeps = propsList.map((key) => {if(key) return key.item});

    const getReferenceProps = React.useCallback(
        (userProps?: React.HTMLProps<HTMLElement> & ExtendedUserProps) =>
            mergeProps(userProps, propsList, 'reference'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        referenceDeps,
    );

    const getFloatingProps = React.useCallback(
        (userProps?: React.HTMLProps<HTMLElement> & ExtendedUserProps) =>
            mergeProps(userProps, propsList, 'floating'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        floatingDeps,
    );

    const getItemProps = React.useCallback(
        (
            userProps?: Omit<React.HTMLProps<HTMLElement>, 'selected' | 'active'> &
                ExtendedUserProps,
        ) => mergeProps(userProps, propsList, 'item'),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        itemDeps,
    );

    return React.useMemo(
        () => ({getReferenceProps, getFloatingProps, getItemProps}),
        [getReferenceProps, getFloatingProps, getItemProps],
    );
}