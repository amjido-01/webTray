"use client"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  subtitle: string
  semiSubtitle?: string
  onAddClick?: () => void
  addLabel?: string
  addIcon?: ReactNode
  showBackButton?: boolean
  backButtonHref?: string
  backButtonLabel?: string
}

export function PageHeader({
  title,
  subtitle,
  semiSubtitle,
  onAddClick,
  addLabel = "Add",
  addIcon = <Plus />,
  showBackButton = false,
  backButtonHref = "/",
  backButtonLabel = "Back",
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      {showBackButton && (
        <Link
          href={backButtonHref}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{backButtonLabel}</span>
        </Link>
      )}

      {/* Header Content */}
      <div className="flex justify-between items-center">
        <div className="text-[#4D4D4D]">
          {semiSubtitle && (
            <p className="font-normal text-[12px] text-[#111827] mb-2 leading-6">
              {semiSubtitle}
            </p>
          )}
          <h2 className="font-bold text-[20px] mb-2 leading-6">{title}</h2>
          <p className="font-normal text-[16px] leading-6">{subtitle}</p>
        </div>
        {onAddClick && (
          <Button onClick={onAddClick} className="rounded-full flex items-center gap-2">
            {addIcon}
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  )
}