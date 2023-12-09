using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactFlowBE.Data;
using ReactFlowBE.DTOs;
using ReactFlowBE.Models;
using System.Text.Json;

namespace ReactFlowBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactFlowsController : ControllerBase
    {
        private readonly DataContext _context;

        public ReactFlowsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReactFlows() => Ok(await _context.ReactFlows.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReactFlowById(Guid id) 
        {
            var reactFlow = await _context.ReactFlows.FindAsync(id);

            if(reactFlow == null) return NotFound();    

            return Ok(reactFlow);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReactFlow(ReactFlowDto reactFlowDto) 
        {
            var reactFlow = new ReactFlow
            {
                Id = Guid.NewGuid(),
                FlowName = reactFlowDto.FlowName,
                Value = JsonSerializer.Serialize(reactFlowDto)
            };

            await _context.ReactFlows.AddAsync(reactFlow);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok("Created Successfully");
            return BadRequest("Problem Saving Changes");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReactFlow(Guid id, ReactFlowDto reactFlowDto)
        {
            var reactFlow = await _context.ReactFlows.FindAsync(id);

            if (reactFlow == null) return NotFound();

            reactFlow.FlowName = reactFlowDto.FlowName;
            reactFlow.Value = JsonSerializer.Serialize(reactFlowDto);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok("Update Successfully");
            return BadRequest("Problem Saving Changes");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReactFlow(Guid id)
        {
            var reactFlow = await _context.ReactFlows.FindAsync(id);

            if (reactFlow == null) return NotFound();

            _context.ReactFlows.Remove(reactFlow);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Could not update DB");
        }
    }
}
