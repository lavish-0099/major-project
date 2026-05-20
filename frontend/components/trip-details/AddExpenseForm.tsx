import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, doc, runTransaction, serverTimestamp, increment } from "firebase/firestore";

interface Member {
    id: string;
    name: string;
}

interface AddExpenseFormProps {
    tripId: string;
    members: Member[];
    onExpenseAdded: () => void;
    currentUser: any; // Firebase user object
    tripPath: string;
}

export default function AddExpenseForm({
    tripId,
    members,
    onExpenseAdded,
    currentUser,
    tripPath,
}: AddExpenseFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState(currentUser?.uid || "");
    const [note, setNote] = useState("");
    const [involvedMembers, setInvolvedMembers] = useState<string[]>(
        members.map((m) => m.id)
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !amount) return;

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const actualTripPath = tripPath || `trips/${tripId}`;

            await runTransaction(db, async (transaction) => {
                const tripRef = doc(db, actualTripPath);

                // 1. Create expense reference
                const expensesRef = collection(db, `${actualTripPath}/expenses`);
                const newExpenseRef = doc(expensesRef);

                // 2. Set expense data
                transaction.set(newExpenseRef, {
                    tripId,
                    title,
                    amount: numAmount,
                    paidBy,
                    involvedMembers,
                    note: note || "",
                    createdAt: serverTimestamp()
                });

                // 3. Update total spent on trip
                transaction.update(tripRef, {
                    totalSpent: increment(numAmount)
                });
            });

            // Reset form
            setTitle("");
            setAmount("");
            setNote("");
            setInvolvedMembers(members.map((m) => m.id));
            setPaidBy(currentUser?.uid || "");
            setIsOpen(false);
            onExpenseAdded(); // Refresh parent
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Error adding expense. Please check your permissions and try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleMember = (memberId: string) => {
        setInvolvedMembers((prev) =>
            prev.includes(memberId)
                ? prev.filter((id) => id !== memberId)
                : [...prev, memberId]
        );
    };

    return (
        <div className="mb-8">
            {!isOpen ? (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add New Expense
                </Button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Add Expense</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-gray-100 rounded-full"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <Input
                                placeholder="e.g. Dinner at Fisherman's Wharf"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                disabled={loading}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount (₹)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="bg-gray-50 border-gray-200 focus:bg-white"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Paid By
                                </label>
                                <select
                                    value={paidBy}
                                    onChange={(e) => setPaidBy(e.target.value)}
                                    className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {members.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Split With (Select Members)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {members.map((member) => {
                                    const isSelected = involvedMembers.includes(member.id);
                                    return (
                                        <button
                                            key={member.id}
                                            type="button"
                                            onClick={() => toggleMember(member.id)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${isSelected
                                                ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                                                : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                                }`}
                                            disabled={loading}
                                        >
                                            {member.name}
                                        </button>
                                    );
                                })}
                            </div>
                            {involvedMembers.length === 0 && (
                                <p className="text-red-500 text-xs mt-1">Select at least one person.</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Note (Optional)
                            </label>
                            <Input
                                placeholder="Details..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                disabled={loading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={loading || involvedMembers.length === 0 || !tripPath}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Expense"}
                            {!tripPath && <span className="text-xs ml-2 text-red-300">(Path Loading...)</span>}
                        </Button>
                    </form>
                </motion.div>
            )}
        </div>
    );
}
