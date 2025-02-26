<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Constructor to protect the routes
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    // Create Task
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => 'Pending',
            'due_date' => $request->due_date,
            'user_id' => Auth::id(),
        ]);

        return response()->json($task, 201);
    }

    // Get Tasks (for the logged-in user)
    public function index()
{
    $tasks = Auth::user()->is_admin ? Task::all() : Auth::user()->tasks()->get();
    return response()->json($tasks);
}

    // Get a single task
    public function show($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or access denied'], 404);
        }

        return response()->json($task);
    }

    // Update Task
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:Pending,In Progress,Completed',
            'due_date' => 'required|date',
        ]);

        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or access denied'], 404);
        }

        $task->update($request->all());
        return response()->json($task);
    }

    // Delete Task
    public function destroy($id)
    {
        $task = Task::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$task) {
            return response()->json(['message' => 'Task not found or access denied'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
