"use client";

import GlobalApi from '@/app/_utils/GlobalApi';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import Image from 'next/image'; // Import Image from 'next/image'
import Link from 'next/link'; // Import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params=usePathname();
  const category=params.split('/')[2];
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const resp = await GlobalApi.getCategory();
      setCategoryList(resp.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err.response ? err.response.data : err.message);
      setError("Failed to load categories");
      setLoading(false);
    }
  };

  return (
    <div className='h-screen fixed mt-5 flex flex-col'>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList && categoryList.map((item, index) => (
              <CommandItem key={index}>
                <Link href={'/search/'+item?.Name} className={`p-2 flex gap-2 text-[14px]  text-blue-600  items-center rounded-md cursor-pointer w-full  ${category==item.Name&&'bg-blue-100'}`}>
                  <Image 
                    src={item.Icon?.url || '/default-icon.png'} // Default image in case of null
                    alt='icon'
                    width={25}
                    height={25}
                  />
                  <label>{item?.Name}</label>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
