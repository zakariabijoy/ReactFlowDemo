using System.ComponentModel.DataAnnotations;

namespace ReactFlowBE.Models;

public class ReactFlow
{
    public Guid Id { get; set; }

    [Required]
    public string FlowName { get; set; }

    [Required]
    public string Value { get; set; }
}
