<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
// ✅ PRIVATE FUNCTION TO CHECK IF ADMIN TOKEN IS VALID
    private function isAuthorized (Request $request)
    {
        return $request -> header('X-ADMIN-TOKEN') === env('ADMIN_TOKEN');
    }
    // ✅ VIEW ALL PROJECTS — PUBLIC
    public function index()
    {
        return Project::all(); // Return all projects as JSON
    }

// ✅ CREATE PROJECT — ADMIN ONLY
    public function store(Request $request)
    {
        if (!$this->isAuthorized($request)){
            return response()->json(['message' => 'Unauthorized'],401);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|string',
            'image' => 'nullable|string',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }
// ✅ VIEW SPECIFIC PROJECT — PUBLIC
    public function show($id)
    {
        return Project::findOrFail($id);
    }

// ✅ UPDATE PROJECT — ADMIN ONLY
    public function update(Request $request, $id)
    {
        if(!$this->isAuthorized($request)){
            return response()->json(['message' => "Unauthorized"], 401);
        }
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|string',
            'image' => 'nullable|string',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'screenshots' => 'nullable|array',
            'screenshots.*.image' => 'required|string',
            'screenshots.*.caption' => 'required|string',

        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Request $request, $id)
    {
        if (!$this->isAuthorized($request)){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
