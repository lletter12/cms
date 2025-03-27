import {Modal} from "@/components/Modal/Modal";
import {ModalContainer} from "@/components/Modal/ModalContainer";
import React from "react";
import {ModalContent} from "@/components/Modal/ModalContent";
import {ModalBody} from "@/components/Modal/ModalBody";
import {MenuProps} from "@/components/types/menu/menu";

export const Menu = ({
                         show,
                         setShow,
                         position = "top-left",
                         centered = "centered",
                         containerClassName,
                         contentClassName,
                         bodyClassName,
                     }: MenuProps) => {

    return (
        <Modal show={show} setShow={setShow}>
            <ModalContainer
                position={position}
                centered={centered}
                className={containerClassName}
            >
                <ModalContent className={contentClassName}>
                    <ModalBody className={bodyClassName}>
                        <>Menu</>
                    </ModalBody>
                </ModalContent>
            </ModalContainer>
        </Modal>
    )
}