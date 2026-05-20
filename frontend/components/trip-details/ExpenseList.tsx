"use client";

import React from "react";
import { Trash2, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Expense {
    id: string;
    title: string;
    amount: number;
    paidBy: string;
    date: any; // Firestore Timestamp
    note?: string;
    involvedMembers: string[];
}

interface Member {
    id: string;
    name: string;
}

interface ExpenseListProps {
    expenses: Expense[];
    members: Member[];
    currentUserId: string;
    onDeleteExpense: (expenseId: string) => void;
}

export default function ExpenseList({
    expenses,
    members,
    currentUserId,
    onDeleteExpense,
}: ExpenseListProps) {

    const getMemberName = (id: string) => {
        const member = members.find((m) => m.id === id);
        return member ? member.name : "Unknown User";
    };

    const sortedExpenses = [...expenses].sort((a, b) => {
        // Handle both Firestore Timestamp, JS Date/String, and null (pending writes)
        const getDate = (d: any) => {
            if (!d) return new Date(); // Fallback for pending writes
            return d.toDate ? d.toDate() : new Date(d);
        };
        const dateA = getDate(a.date);
        const dateB = getDate(b.date);
        return dateB.getTime() - dateA.getTime();
    });

    if (expenses.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No expenses added yet.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {sortedExpenses.map((expense) => {
                // Safe date handling
                let date = new Date();
                if (expense.date) {
                    date = expense.date.toDate ? expense.date.toDate() : new Date(expense.date);
                }

                const isPayer = expense.paidBy === currentUserId;

                return (
                    <div
                        key={expense.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition-shadow"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{expense.title}</h4>
                                <span className="text-xs text-gray-400">• {date.toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                    <span>Paid by <span className="font-medium text-gray-900">{getMemberName(expense.paidBy)}</span></span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="w-3.5 h-3.5 text-gray-400" />
                                    <span>For {expense.involvedMembers.length} people</span>
                                </div>
                            </div>
                            {expense.note && (
                                <p className="text-xs text-gray-500 mt-1 italic">&quot;{expense.note}&quot;</p>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span className="font-bold text-gray-900 text-lg">
                                ₹{(expense.amount && !isNaN(expense.amount) ? expense.amount : 0).toLocaleString("en-IN")}
                            </span>

                            {isPayer && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onDeleteExpense(expense.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2 -mr-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
