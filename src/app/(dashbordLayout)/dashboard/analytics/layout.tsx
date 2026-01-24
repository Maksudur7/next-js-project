import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

// ১. ফাংশনের নাম PascalCase এ পরিবর্তন করা হয়েছে
interface AnalyticsLayoutProps {
  children: ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <div>
      <div className="flex gap-2 p-4"> {/* একটু গ্যাপ দেওয়ার জন্য স্টাইল যোগ করা হয়েছে */}
        <Button asChild>
          {/* ২. পাথের শুরুতে '/' যোগ করা হয়েছে */}
          <Link href="/dashboard/analytics/weekly">Weekly</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/analytics/monthly">Monthly</Link>
        </Button>
      </div>
      <main>{children}</main>
    </div>
  );
}