"use client";

import React, { useMemo } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

interface Expense {
    id: string;
    amount: number;
    paidBy: string;
    involvedMembers: string[];
}

interface Member {
    id: string;
    name: string;
}

interface SettlementSummaryProps {
    expenses: Expense[];
    members: Member[];
}

export default function SettlementSummary({ expenses, members }: SettlementSummaryProps) {
    const settlements = useMemo(() => {
        const balances: Record<string, number> = {};

        // Initialize balances
        members.forEach((m) => (balances[m.id] = 0));

        // Calculate balances
        expenses.forEach((expense) => {
            const payer = expense.paidBy;
            const amount = (expense.amount && !isNaN(expense.amount)) ? expense.amount : 0;
            const involved = expense.involvedMembers;

            if (involved.length === 0) return;

            const splitAmount = amount / involved.length;

            // Payer gets credit (positive)
            balances[payer] = (balances[payer] || 0) + amount;

            // Involved members get debit (negative)
            involved.forEach((memberId) => {
                balances[memberId] = (balances[memberId] || 0) - splitAmount;
            });
        });

        // Separate into debtors and creditors
        let debtors: { id: string; amount: number }[] = [];
        let creditors: { id: string; amount: number }[] = [];

        Object.entries(balances).forEach(([id, amount]) => {
            if (amount < -0.01) debtors.push({ id, amount }); // Negative means they owe
            if (amount > 0.01) creditors.push({ id, amount }); // Positive means they represent what is owed to them
        });

        // Sort by magnitude
        debtors.sort((a, b) => a.amount - b.amount); // Ascending (most negative first)
        creditors.sort((a, b) => b.amount - a.amount); // Descending (most positive first)

        const result: { from: string; to: string; amount: number }[] = [];

        let i = 0; // debtor index
        let j = 0; // creditor index

        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];

            // The amount to settle is the minimum of what debtor owes and what creditor is owed
            const amount = Math.min(Math.abs(debtor.amount), creditor.amount);

            if (amount > 0.01) {
                result.push({
                    from: debtor.id,
                    to: creditor.id,
                    amount,
                });
            }

            // Adjust remaining balances
            debtor.amount += amount;
            creditor.amount -= amount;

            // Move indices if settled
            if (Math.abs(debtor.amount) < 0.01) i++;
            if (creditor.amount < 0.01) j++;
        }

        return result;
    }, [expenses, members]);

    const getMemberName = (id: string) => members.find((m) => m.id === id)?.name || "Unknown";

    if (expenses.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Settlements</h3>

            {settlements.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">All settled up! No one owes anything.</span>
                </div>
            ) : (
                <div className="space-y-3">
                    {settlements.map((s, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-2 flex-1">
                                <span className="font-medium text-gray-700">{getMemberName(s.from)}</span>
                                <span className="text-xs text-gray-400">pays</span>
                                <span className="font-medium text-gray-700">{getMemberName(s.to)}</span>
                            </div>
                            <div className="font-bold text-gray-900">
                                ₹{s.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </div>
                            {/* Arrow Icon for visual flow */}
                            <div className="mx-2 text-gray-300">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
