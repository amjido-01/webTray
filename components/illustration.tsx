export function Illustration() {
  return (
    <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(60, 0)">
        {/* Person 1 - left */}
        <g transform="translate(0, 20)">
          <path d="M50 120 L45 170" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 120 L75 170" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M45 170 L40 180" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M75 170 L80 180" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M60 70 L40 110" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M60 70 L80 90" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="60" r="15" fill="#4169E1" />
          <path d="M40 80 Q60 120 80 80" fill="#333" stroke="#333" strokeWidth="1" />
        </g>

        {/* Person 2 - right */}
        <g transform="translate(120, 20)">
          <path d="M50 120 L45 170" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 120 L75 170" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M45 170 L40 180" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M75 170 L80 180" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M60 70 L80 110" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M60 70 L40 90" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="60" r="15" fill="#333" />
          <path d="M40 80 Q60 120 80 80" fill="#333" stroke="#333" strokeWidth="1" />
        </g>

        {/* Document/interface they're holding */}
        <g transform="translate(60, 50)">
          <rect x="0" y="0" width="80" height="60" rx="5" fill="white" stroke="#ddd" strokeWidth="2" />
          <line x1="15" y1="15" x2="65" y2="15" stroke="#4169E1" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="30" x2="65" y2="30" stroke="#4169E1" strokeWidth="3" strokeLinecap="round" />
          <rect x="55" y="45" width="15" height="10" rx="2" fill="#4169E1" />
        </g>
      </g>
    </svg>
  )
}
