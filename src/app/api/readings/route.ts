import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get("stationId");
    const limit = Math.min(Number(searchParams.get("limit") ?? "100") || 100, 500);

    const supabase = createSupabaseServerClient();
    let query = supabase
      .from("readings")
      .select("id, station_id, ntu, recorded_at, source, equipment, recorded_by")
      .order("recorded_at", { ascending: false })
      .limit(limit);

    if (stationId) {
      query = query.eq("station_id", stationId);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ readings: data ?? [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { station_id, ntu, source, equipment } = body ?? {};

    if (!station_id || typeof ntu !== "number") {
      return NextResponse.json(
        { error: "station_id and ntu are required" },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("readings")
      .insert({
        station_id,
        ntu,
        source: source ?? "manual",
        equipment: equipment ?? "NTU-Logger",
        recorded_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ reading: data }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
