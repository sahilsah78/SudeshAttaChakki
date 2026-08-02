export function CardPagination({
  initialCardIndex,
  PaginationCurrentTextEl,
  totalCards,
}) {
  return (
    <div className="font-poppins mx-auto mt-5 w-14.5 rounded-full bg-[#2A1D1D] px-4.5 py-1 text-center text-xs font-semibold text-white shadow-[inset_0_2px_2px_rgba(255_255_255_0.12),inset_0_-2px_3px_rgba(0_0_0_0.35)] select-none">
      <span ref={PaginationCurrentTextEl}>{initialCardIndex + 1}</span>/
      {totalCards}
    </div>
  );
}
