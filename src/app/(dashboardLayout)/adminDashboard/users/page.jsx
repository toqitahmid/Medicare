"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { Avatar, Chip, Tooltip, Button, Spinner } from "@heroui/react";
import { toast } from "react-toastify";
import { Check, X, Ban, Undo2 } from "lucide-react";

const statusColorMap = {
    approved: "success",
    rejected: "danger",
    pending: "primary",
    suspended: "danger",
    banned: "danger",
};

// FIXED: Moved columns OUTSIDE the component to ensure a stable memory reference
const columns = [
    { name: "USER", uid: "user" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refreshUsers = () => setRefreshTrigger(prev => prev + 1);

    useEffect(() => {
        let isMounted = true;

        const loadUsers = async () => {
            try {
                const { data, error } = await authClient.admin.listUsers({
                    query: {
                        limit: 100,
                    }
                });

                if (error) {
                    toast.error(error.message || "Failed to fetch users");
                } else if (data && isMounted) {
                    let usersList = data.users || (Array.isArray(data) ? data : []);

                    // Filter out admin users
                    usersList = usersList.filter(user => user.role !== "admin");

                    // FIXED: Forcefully assign a guaranteed safe key to prevent React Stately from crashing
                    usersList = usersList.map((user, index) => ({
                        ...user,
                        _safeKey: user.id || user._id || user.email || `fallback-key-${index}`
                    }));

                    setUsers(usersList);
                }
            } catch (error) {
                console.error(error);
                if (isMounted) toast.error("An error occurred while fetching users");
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadUsers();

        return () => {
            isMounted = false;
        };
    }, [refreshTrigger]);

    const handleApprove = async (userId) => {
        try {
            const { error } = await authClient.admin.updateUser({
                userId,
                data: {
                    status: "approved"
                }
            });
            if (error) {
                toast.error(error.message || "Failed to approve user");
            } else {
                toast.success("User approved");
                refreshUsers();
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleReject = async (userId) => {
        try {
            const { error } = await authClient.admin.updateUser({
                userId,
                data: {
                    status: "rejected"
                }
            });
            if (error) {
                toast.error(error.message || "Failed to reject user");
            } else {
                toast.success("User rejected");
                refreshUsers();
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleSuspend = async (userId) => {
        try {
            const { error: updateError } = await authClient.admin.updateUser({
                userId,
                data: {
                    status: "suspended"
                }
            });
            
            if (updateError) {
                toast.error(updateError?.message || "Failed to suspend user");
            } else {
                toast.success("User suspended");
                refreshUsers();
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleUnban = async (userId) => {
        try {
            const { error: updateError } = await authClient.admin.updateUser({
                userId,
                data: {
                    status: "approved"
                }
            });
            // Just in case they were previously banned, we also attempt an unban.
            await authClient.admin.unbanUser({ userId });

            if (updateError) {
                toast.error(updateError?.message || "Failed to unban user");
            } else {
                toast.success("User unsuspended");
                refreshUsers();
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "user":
                return (
                    <div className="flex items-center gap-3">
                        <Avatar radius="lg" src={user.photo || user.image} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-xs text-default-500">{user.email}</span>
                        </div>
                    </div>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                const statusStr = user.banned ? "banned" : (user.status || "pending");
                return (
                    <Chip 
                        className="capitalize border-none font-medium" 
                        color={statusColorMap[statusStr] || "default"} 
                        size="sm" 
                        variant="flat"
                    >
                        {statusStr}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        {user.banned || user.status === "suspended" ? (
                            <Button size="sm" color="primary" variant="flat" onPress={() => handleUnban(user.id || user._id)}>
                                Unsuspend
                            </Button>
                        ) : (
                            <>
                                {user.status !== "approved" && (
                                    <Button size="sm" color="success" variant="flat" onPress={() => handleApprove(user.id || user._id)}>
                                        Approve
                                    </Button>
                                )}
                                {(user.status === "pending" || !user.status) && (
                                    <Button size="sm" color="danger" variant="flat" onPress={() => handleReject(user.id || user._id)}>
                                        Reject
                                    </Button>
                                )}
                                {(user.status === "approved" || user.status === "pending" || !user.status) && (
                                    <Button size="sm" color="warning" variant="flat" onPress={() => handleSuspend(user.id || user._id)}>
                                        Suspend
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="bg-background/60 backdrop-blur-xl border border-divider rounded-2xl shadow-medium w-full overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-max border-collapse">
                        <thead className="bg-default-100/50 backdrop-blur-md border-b border-divider">
                            <tr>
                                <th className="py-4 px-6 text-xs font-semibold text-default-500 uppercase tracking-widest">User</th>
                                <th className="py-4 px-6 text-xs font-semibold text-default-500 uppercase tracking-widest">Role</th>
                                <th className="py-4 px-6 text-xs font-semibold text-default-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-xs font-semibold text-default-500 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && users.length === 0 ? null : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-12 text-center text-default-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((item) => (
                                    <tr key={item._safeKey} className="group border-b border-divider/50 hover:bg-default-50/50 transition-all duration-200">
                                        <td className="py-3 px-6">{renderCell(item, "user")}</td>
                                        <td className="py-3 px-6">{renderCell(item, "role")}</td>
                                        <td className="py-3 px-6">{renderCell(item, "status")}</td>
                                        <td className="py-3 px-6 align-middle">{renderCell(item, "actions")}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}