"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, IndianRupee, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BudgetDisplayProps {
    budget: number;
    totalSpent: number;
    currency?: string;
    onEditBudget?: (newBudget: number) => Promise<void>;
}

export default function BudgetDisplay({
    budget,
    totalSpent,
    currency = "INR",
    onEditBudget,
}: BudgetDisplayProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newBudget, setNewBudget] = useState(budget.toString());
    const [loading, setLoading] = useState(false);

    // 1. Calculate Percentage
    const safeBudget = (budget && !isNaN(budget)) ? budget : 0; // Handle undefined/null/NaN
    const safeTotalSpent = (totalSpent && !isNaN(totalSpent)) ? totalSpent : 0;

    // safeBudget > 0 ? (safeTotalSpent / safeBudget) * 100 : (safeTotalSpent > 0 ? 100 : 0)
    const percentage = safeBudget > 0 ? Math.min((safeTotalSpent / safeBudget) * 100, 100) : (safeTotalSpent > 0 ? 100 : 0);

    const isOverBudget = safeTotalSpent > safeBudget;
    const remaining = safeBudget - safeTotalSpent;

    // 2. Determine Color Status
    let progressColor = "bg-green-500";
    let statusText = "On Track";
    if (percentage > 90) {
        progressColor = "bg-red-500";
        statusText = "Critical";
    } else if (percentage > 70) {
        progressColor = "bg-orange-400";
        statusText = "Watching";
    } else if (percentage > 50) {
        progressColor = "bg-yellow-400";
    }

    if (isOverBudget) {
        progressColor = "bg-red-600";
        statusText = "Over Budget";
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleSave = async () => {
        if (!onEditBudget) return;
        const amount = parseFloat(newBudget);
        if (isNaN(amount) || amount < 0) return;

        setLoading(true);
        try {
            await onEditBudget(amount);
            setIsEditing(false);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-800">Trip Budget</h2>
                        {onEditBudget && !isEditing && (
                            <button
                                onClick={() => {
                                    setNewBudget(safeBudget.toString());
                                    setIsEditing(true);
                                }}
                                className="text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        Status: <span className={`font-medium ${isOverBudget ? "text-red-600" : "text-gray-700"}`}>{statusText}</span>
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Remaining</p>
                    {isEditing ? (
                        <div className="flex items-center gap-2 mt-1">
                            <Input
                                type="number"
                                value={newBudget}
                                onChange={(e) => setNewBudget(e.target.value)}
                                className="w-24 h-8 text-right"
                                autoFocus
                            />
                            <Button size="icon" className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white" onClick={handleSave} disabled={loading}>
                                <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditing(false)} disabled={loading}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <p className={`text-2xl font-bold ${remaining < 0 ? "text-red-500" : "text-green-600"}`}>
                            {formatCurrency(remaining)}
                        </p>
                    )}
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${progressColor} rounded-full`}
                />
            </div>

            {/* Stats Row */}
            <div className="flex justify-between mt-3 text-sm font-medium text-gray-600">
                <div>
                    Spent: <span className="text-gray-900">{formatCurrency(safeTotalSpent)}</span>
                </div>
                <div>
                    Total: <span className="text-gray-900">{formatCurrency(safeBudget)}</span>
                </div>
            </div>

            {/* Over Budget Warning */}
            {isOverBudget && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-700"
                >
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                        You have exceeded your total budget by <strong>{formatCurrency(safeTotalSpent - safeBudget)}</strong>.
                        Review your expenses to get back on track.
                    </div>
                </motion.div>
            )}
        </div>
    );
}
