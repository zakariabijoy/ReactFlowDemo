namespace ReactFlowBE.DTOs
{
    public class ReactFlowDto
    {
        public string FlowName { get; set; }
        public List<Node> Nodes { get; set; }
        public List<Edge> Edges { get; set; }
    }

    public class Data
    {
        public string Label { get; set; }
        public string Value { get; set; }
    }

    public class Edge
    {
        public string Id { get; set; }
        public string Source { get; set; }
        public string SourceHandle { get; set; }
        public string Target { get; set; }
        public string TargetHandle { get; set; }
    }

    public class Node
    {
        public string Id { get; set; }
        public Position Position { get; set; }
        public Data Data { get; set; }
        public string Type { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public bool? Selected { get; set; }
        public PositionAbsolute PositionAbsolute { get; set; }
        public bool? Dragging { get; set; }
    }

    public class Position
    {
        public double X { get; set; }
        public double Y { get; set; }
    }

    public class PositionAbsolute
    {
        public double X { get; set; }
        public double Y { get; set; }
    }
}
