<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TicketHdr;
use App\Models\TicketStatus;
class TicketHdrSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ticketHdrs = TicketHdr::factory()->count(10)->create();

        foreach ($ticketHdrs as $ticket) {
            TicketStatus::create([
                'ticket_id' => $ticket->id,
                'emp_id' =>null,
                'updated_by' =>  1,
                'status' =>  1,
                'remarks' =>  "test",
            ]);
        }
    }
}
