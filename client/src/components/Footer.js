export default function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <div class="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
        <p class="text-sm/6 text-slate-600 max-md:text-center">
          © 2024 Cây dừa Bistro. All rights reserved.
        </p>
        <div class="flex items-center justify-center space-x-4 text-sm/6 font-semibold text-slate-900 md:justify-end">
          <a href="/privacy-policy">Privacy policy</a>
          <div class="h-4 w-px bg-slate-200"></div>
          <a href="/changelog">Changelog</a>
        </div>
      </div>
    </footer>
  );
}
