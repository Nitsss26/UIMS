import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, BookOpen, User, Calendar } from 'lucide-react';
import { getStatusColor } from '@/utils/helpers';

export default function BookCatalog() {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Book Catalog</h2>
          <p className="text-slate-500">Manage library books and resources</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Book
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search books by title, author, ISBN..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.books.map((book) => (
          <Card key={book.id} className="border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-slate-500">{book.author}</p>
                  <p className="text-xs text-slate-400 mt-1">ISBN: {book.isbn}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{book.category}</Badge>
                    <Badge className={getStatusColor(book.status)}>{book.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{book.available}/{book.quantity} available</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Shelf: {book.shelfNo}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
