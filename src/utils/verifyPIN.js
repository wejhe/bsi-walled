import React from 'react'
import api from "../utils/api";

export const verifyPIN = async (pin) => {
    const response = await api.post("/auth/verify-pin",
        { pin },
    );
    return (
        response.data
    )
}