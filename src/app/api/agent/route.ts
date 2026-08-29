import { NextResponse } from "next/server";
import { agentManifest } from "@/lib/m3/agent";

/**
 * GET /api/agent
 *
 * Agent discovery endpoint. The manifest is generated beside the registry so
 * component counts, package facts, themes, and MCP tool names stay aligned.
 */
export async function GET() {
  return NextResponse.json(agentManifest);
}
