"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

function HomeSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchText, setSearchText] = useState(searchParams.get("name") || "");
    const [selectedType, setSelectedType] = useState(searchParams.get("type") || "hotel");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token }: any = useToken();

    const fetchResults = async (search: string, type: string) => {
        if (!search.trim()) return;
        setLoading(true);
        try {
            let response = type === "restaurant"
                ? await UserService.getAllRestaurants({ token })
                : await UserService.getAllHotels({ token });

            const filtered = response?.data?.data?.filter((item: any) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setResults(filtered);
        } catch (err) {
            console.error("Search failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!searchText.trim()) return;
        const params = new URLSearchParams();
        params.set("name", searchText);
        params.set("type", selectedType);
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        const query = searchParams.get("name") || "";
        const type = searchParams.get("type") || "hotel";
        setSearchText(query);
        setSelectedType(type);
        if (query) {
            fetchResults(query, type);
        } else {
            setResults([]);
        }
    }, [searchParams.toString()]);

    return (
        <div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-[12px] border border-[#737373] bg-[#FFFFFF1A] backdrop-blur-xs">
                <div className="relative w-full sm:w-[500px] border border-[#737373] rounded-[8px] bg-white">
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-8 pr-[130px] h-[60px] text-[#111111] placeholder:text-[#737373] text-[16px] leading-[130%] border-none focus:border-none focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0"
                    />
                    <div className="absolute right-0 px-8 top-1/2 -translate-y-1/2 z-50">
                        <Select value={selectedType} onValueChange={(val) => setSelectedType(val)}>
                            <SelectTrigger className="w-full border-none p-0 m-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none">
                                <SelectValue placeholder="Hotel" />
                            </SelectTrigger>
                            <SelectContent className="border-none focus:ring-0 focus-visible:ring-0">
                                <SelectItem value="hotel" className="focus:bg-gray-100 focus:text-gray-900 shadow-none">Hotel</SelectItem>
                                <SelectItem value="restaurant" className="focus:bg-gray-100 focus:text-gray-900 shadow-none">Restaurant</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[1px] bg-[#B0B0B0]"></div>
                    </div>

                    {/* ✅ Fixed results dropdown */}
                    {searchText !== "" && (
                        <div className="mt-6 bg-white absolute top-10 left-0 p-4 z-10 max-h-[300px] overflow-y-auto shadow-md w-full">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                results.length > 0 ? results.map((item: any) => (
                                    <Link href={item?.bookingLink} key={item.id} className="py-3 flex items-center border-b gap-2">
                                        <div className="w-12 h-10">
                                            <Image src={item?.image} alt={item?.name} width={50} height={40} className="w-full h-full rounded-[2px]" />
                                        </div>
                                        <p className="py-1 bg-white text-base text-black px-4">
                                            {item.name}
                                        </p>
                                    </Link>
                                )) : (
                                    <p className="py-1 bg-white text-black font-semibold px-4 border-b">Not found this item!</p>
                                )
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSearch}
                    className="flex cursor-pointer items-center justify-center h-[60px] w-[60px] bg-[#F81E1E] rounded-[8px]"
                >
                    <Search size={16} color="white" />
                </button>
            </div>
        </div>
    );
}

export default HomeSearch;
