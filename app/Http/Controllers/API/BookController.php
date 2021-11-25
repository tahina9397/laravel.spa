<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookController extends Controller
{
    // all books
    public function index()
    {
        $id_user = Auth::user()->id;
        $books = Book::where("user_id", $id_user)->get()->toArray();
        return array_reverse($books);

        // $books = Book::all()->toArray();
        // return Inertia::render('Books', [
        //     'books' => $books
        // ]);
    }

    // add book
    public function add(Request $request,Book $book)
    {
        $book->name = $request->name;
        $book->author = $request->author;
        $book->user()->associate($request->user());
        $book->save();

        return response()->json('The book successfully added');
    }

    // edit book
    public function edit($id)
    {
        $book = Book::find($id);
        return response()->json($book);
    }

    // update book
    public function update($id, Request $request)
    {
        $book = Book::find($id);
        $book->update($request->all());

        return response()->json('The book successfully updated');
    }

    // delete book
    public function delete($id)
    {
        $book = Book::find($id);
        $book->delete();

        return response()->json('The book successfully deleted');
    }
}
