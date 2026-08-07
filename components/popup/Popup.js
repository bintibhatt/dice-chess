"use client";

import { Children, cloneElement } from "react";
import { useAppContext } from "../game/GameContext";
import { Status } from "@/lib/state/constants";
import { closePopup } from "@/lib/state/actions/popup";

const Popup = ({ children }) => {
  const {
    appState: { status },
    dispatch,
  } = useAppContext();

  const onClosePopup = () => dispatch(closePopup());

  if (status === Status.ongoing) return null;

  return Children.toArray(children).map((child) => cloneElement(child, { onClosePopup }));
};

export default Popup;
