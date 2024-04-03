import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import IconButton from "./Icon-Button";
import Table from "./table/Table";
import TableHeader from "./table/Table-Header";
import TableCell from "./table/Table-Cell";
import TableRow from "./table/Table-Row";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/pt-br'
interface Attendee {
  id: string;
  name: string;
  email: string;
  checkedInAt: string | null;
  createdAt: string;
}

dayjs.extend(relativeTime)
dayjs.locale('pt-br')
const ITEMS_PER_PAGE = 10

export default function AttendeeList() {
  const [page, setPage] = useState(() => {
    const currentURL = new URL(window.location.toString())
    if (currentURL.searchParams.has('page')){
      return parseInt(currentURL.searchParams.get('page')!)
    }
    
    return 1
  }
  )
  const [search, setSearch] = useState(() => {
    const currentURL = new URL(window.location.toString())
    if (currentURL.searchParams.has('search')){
      return currentURL.searchParams.get('search') || ''
    }
    
    return ''
  })
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [totalItems, setTotalItems] = useState(0)

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  useEffect(() => {
   const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
   url.searchParams.set('pageIndex', String(page - 1))
   if (search.length > 0) url.searchParams.set('query', String(search))
   const fethData = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setAttendees(data.attendees)
      setTotalItems(data.total)
    })
    .catch(error => console.log(error))
   }

   fethData()
  }, [page, search])

  const setCurrentPage = (page: number) => {
    const currentURL = new URL(window.location.toString())
    currentURL.searchParams.set('page', String(page))
    window.history.pushState({}, "", currentURL)
    setPage(page)
  }

  const setCurrentSearch = (search: string) => {
    const currentURL = new URL(window.location.toString())
    currentURL.searchParams.set('search', String(search))
    window.history.pushState({}, "", currentURL)
    setSearch(search)
  }

  const goToNextPage = () => {
    if (page >= totalPages) return
    setCurrentPage(page + 1)
    
  }
  const goToPreviousPage = () => {
    if (page <= 1) return
    setCurrentPage(page - 1)
  }
  const goToFirstPage = () => {
    setCurrentPage(1)
  }
  const goToLastPage = () => {
    setCurrentPage(totalPages)
  }
  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    goToFirstPage()
    setCurrentSearch(event.target.value);
  }
  
return (
  <div  className="flex flex-col gap-4">
  <div className="flex gap-5">
    <h1 className="text-2xl font-bold">Participante</h1>
    <div className="px-3 py-1.5 border w-72  border-white/10 rounded-lg text-sm flex items-center gap-3" >
      <Search  className="size-4 text-emerald-300"/>
      <input 
        value={search}
        onChange={onSearchInputChanged} 
        className="bg-transparent w-full flex-1 border-0 p-0 text-sm outline-none focus:ring-0" 
        placeholder="Buscar participante..."
      />
    </div> 
  </div>
    <Table>
        <thead>
          <TableRow>
            <TableHeader style={{width: 48}}>
              <input type="checkbox" disabled className="size-4 bg-black/20 rounded border border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{width: 64}}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.length > 0 ? (  attendees.map((attendee, i) => (
              <TableRow key={i} className="border-b border-white/10 text-left hover:bg-white/5">
                  <TableCell>
                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{attendee.name}</span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell><span>{dayjs().to(attendee.createdAt)}</span></TableCell>
                  <TableCell><span>{attendee.checkedInAt === null 
                  ? <span className="text-zinc-400">Não fex check-in</span> 
                  : dayjs().to(attendee.checkedInAt)}</span></TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal  className="size-4"/>
                    </IconButton>
                  </TableCell>
              </TableRow>
          ))) : ('')}
        </tbody>
        <tfoot>
          <TableCell colSpan={3}>
            Mostrando {attendees.length} de {totalItems} itens
          </TableCell>
          <TableCell colSpan={3} className="text-right">
           <div className="flex items-center gap-8 justify-end">
              <span> Página {page} de {totalPages}</span>
              <div className="flex gap-1.5">
                <IconButton onClick={goToFirstPage} disabled={page <= 1}>
                  <ChevronsLeft  className="size-4"/>
                </IconButton>
                <IconButton onClick={goToPreviousPage} disabled={page <= 1}>
                  <ChevronLeft  className="size-4"/>
                </IconButton>
                <IconButton onClick={goToNextPage} disabled={page >= totalPages}>
                  <ChevronRight className="size-4"/>
                </IconButton>
                <IconButton onClick={goToLastPage} disabled={page >= totalPages}>
                  <ChevronsRight  className="size-4"/>
                </IconButton>
              </div>
            </div>
          </TableCell>
        </tfoot>
      </Table>
  </div>
)
}